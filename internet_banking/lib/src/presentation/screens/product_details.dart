import 'package:flutter/material.dart';
import 'package:internet_banking/src/src.dart';

class ProductDetailsScreen extends StatelessWidget {
  const ProductDetailsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final product = ModalRoute.of(context)!.settings.arguments as ProductModel;
    return Scaffold(
      body: CustomScrollView(
        slivers: [
          const SliverAppBar(
            expandedHeight: 150,
            pinned: true,
            flexibleSpace: FlexibleSpaceBar(
              background: Image(
                image: AssetImage('assets/bank.png'),
                fit: BoxFit.cover,
              ),
            ),
          ),
          SliverList(
            delegate: SliverChildListDelegate(
              [
                Container(
                  padding: const EdgeInsets.all(20.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      ProductInfo(
                        label: 'Pin',
                        value: product.pin!,
                      ),
                      ProductInfo(
                        label: 'Card Holder',
                        value: product.cardHolder!,
                      ),
                      ProductInfo(
                        label: 'Balance',
                        value: '\$ ${product.balance}',
                      ),
                      ProductInfo(
                        label: 'Card Number',
                        value: product.cardNumber!,
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class ProductInfo extends StatelessWidget {
  final String label;
  final String value;
  const ProductInfo({super.key, required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Text(
          '$label : ',
          style: const TextStyle(
            fontSize: 24.0,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(width: 10.0),
        Text(
          value,
          style: const TextStyle(
            fontSize: 24.0,
          ),
        ),
      ],
    );
  }
}
