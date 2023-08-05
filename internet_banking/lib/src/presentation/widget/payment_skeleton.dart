import 'package:flutter/material.dart';
import 'package:shimmer/shimmer.dart';

class PaymentSkeleton extends StatelessWidget {
  const PaymentSkeleton({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(10.0),
      child: ListView.builder(
          itemCount: 10,
          itemBuilder: (context, index) {
            return Card(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10.0),
                side: BorderSide(
                  color: Colors.blue[800]!,
                  width: 1.0,
                ),
              ),
              child: ListTile(
                title: Shimmer.fromColors(
                  baseColor: Colors.grey[300]!,
                  highlightColor: Colors.grey[100]!,
                  child: Container(
                    height: 10.0,
                    width: 60.0,
                    color: Colors.grey,
                  ),
                ),
                subtitle: Shimmer.fromColors(
                  baseColor: Colors.grey[300]!,
                  highlightColor: Colors.grey[100]!,
                  child: Container(
                    height: 10.0,
                    width: 40.0,
                    color: Colors.grey,
                  ),
                ),
                trailing: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Shimmer.fromColors(
                      baseColor: Colors.grey[300]!,
                      highlightColor: Colors.grey[100]!,
                      child: Container(
                        height: 12.0,
                        width: 75.0,
                        color: Colors.grey, 
                      ),
                    ),
                    const SizedBox(height: 10.0),
                    Shimmer.fromColors(
                      baseColor: Colors.grey[300]!,
                      highlightColor: Colors.grey[100]!,
                      child: Container(
                        height: 12.0,
                        width: 75.0,
                        color: Colors.grey,
                      ),
                    ),
                  ],
                ),
              ),
            );
          }),
    );
  }
}
