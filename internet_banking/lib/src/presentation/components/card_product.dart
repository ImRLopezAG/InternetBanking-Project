import 'package:flutter/material.dart';
import 'package:internet_banking/src/src.dart';

class ProductCard extends StatelessWidget {
  final ProductModel product;
  const ProductCard({Key? key, required this.product}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    return ClipRRect(
      borderRadius: BorderRadius.circular(20.0),
      child: Container(
        color: product.cardHolder == 'Visa' ? Colors.black : Colors.red[900],
        width: double.infinity,
        padding: const EdgeInsets.symmetric(
          horizontal: 15.0,
          vertical: 10.0,
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                Image.asset(
                  'assets/img/chip.png',
                  width: 60.0,
                  height: 50.0,
                ),
              ],
            ),
            SizedBox(
              width: size.width * .6,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    '**** **** ${product.cardNumber!.substring(product.cardNumber!.length - 4)}',
                    style: const TextStyle(
                      fontSize: 35.0,
                      fontWeight: FontWeight.bold,
                      height: .8,
                    ),
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        '${product.cvv}',
                        style: const TextStyle(
                          fontSize: 20.0,
                        ),
                      ),
                      Text(
                        '${product.expirationDate}',
                        style: const TextStyle(
                          fontSize: 15.0,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                Image.asset(
                  'assets/img/${product.cardHolder}.png',
                  width: 50.0,
                  alignment: Alignment.bottomRight,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
