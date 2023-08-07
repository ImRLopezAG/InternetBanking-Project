import 'package:dart_jsonwebtoken/dart_jsonwebtoken.dart';
import 'package:flutter/material.dart';
import 'package:internet_banking/src/src.dart';
import 'package:provider/provider.dart';

class UserScreen extends StatelessWidget {
  const UserScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final appProvider = Provider.of<AppProvider>(context);
    final productProvider = Provider.of<ProductProvider>(context);
    final payload = Payload.fromJson(JWT.decode(appProvider.token).payload);

    return ScreenFuture(
        future: appProvider.setUser,
        skeleton: const HomeSkeleton(),
        child: SingleChildScrollView(
          child: Column(
            children: [
              FutureBuilder<List<ProductModel>>(
                future: productProvider.getAll(
                    token: appProvider.token,
                    id: appProvider.user.id ?? payload.uid!),
                builder: (context, snapshot) {
                  if (snapshot.hasData) {
                    if (snapshot.data!.isNotEmpty) {
                      final principal = productProvider.principal;
                      return Container(
                        height: 180,
                        padding: const EdgeInsets.only(
                          top: 10.0,
                          left: 20.0,
                          right: 20.0,
                        ),
                        child: GestureDetector(
                          onTap: () {
                            Navigator.pushNamed(
                              context,
                              '/product-details',
                              arguments: principal,
                            );
                          },
                          child: ProductCard(
                            product: principal,
                          ),
                        ),
                      );
                    }
                    return const SizedBox();
                  } else {
                    return const SizedBox();
                  }
                },
              ),
              const SizedBox(height: 15.0),
              const CardSwipper(),
              const SizedBox(height: 15.0),
              const Sliders(
                title: 'Beneficiaries',
              ),
            ],
          ),
        ));
  }
}
