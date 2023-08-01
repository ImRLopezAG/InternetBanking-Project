import 'package:flutter/material.dart';

class ScreenFuture extends StatelessWidget {
  final Widget child;
  final Widget skeleton;
  final Future<bool> Function() future;
  const ScreenFuture(
      {Key? key,
      required this.child,
      required this.skeleton,
      required this.future})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<bool>(
      future: future(),
      builder: (context, snapshot) {
        if (snapshot.hasData) {
          if (snapshot.data!) {
            return child;
          } else {
            return skeleton;
          }
        } else {
          return skeleton;
        }
      },
    );
  }
}
