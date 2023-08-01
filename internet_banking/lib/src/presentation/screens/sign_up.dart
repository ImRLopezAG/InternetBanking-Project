import 'package:flutter/material.dart';
import 'package:internet_banking/src/src.dart';

class SigInScreen extends StatelessWidget {
  const SigInScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Register'),
        centerTitle: true,
      ),
      body: const UserForm(),
    );
  }
}
