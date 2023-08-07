import 'package:flutter/material.dart';
import 'package:card_swiper/card_swiper.dart';
import 'package:internet_banking/src/src.dart';
import 'package:provider/provider.dart';

class CardSwipper extends StatelessWidget {
  const CardSwipper({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final appProvider = Provider.of<AppProvider>(context);
    final productProvider = Provider.of<ProductProvider>(context);
    final size = MediaQuery.of(context).size;
    return FutureBuilder<List<ProductModel>>(
      future: productProvider.getAll(
          token: appProvider.token, id: appProvider.user.id!),
      builder: (context, snapshot) {
        if (snapshot.hasData) {
          final products = productProvider.others;
          return Column(
            children: [
              Text(
                products.isNotEmpty ? 'Other accounts' : '',
                style: const TextStyle(
                  fontSize: 20.0,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 15.0),
              Swiper(
                itemCount: products.length,
                layout: SwiperLayout.STACK,
                itemWidth: size.width * 0.9,
                itemHeight: size.height * 0.25,
                axisDirection: AxisDirection.right,
                itemBuilder: (_, int index) {
                  final product = products[index];
                  return GestureDetector(
                    onTap: () {
                      Navigator.pushNamed(
                        context,
                        '/product-details',
                        arguments: product,
                      );
                    },
                    child: ProductCard(product: product),
                  );
                },
              ),
            ],
          );
        }
        return const SizedBox();
      },
    );
  }
}
