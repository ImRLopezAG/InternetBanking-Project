import 'package:flutter/material.dart';
import 'package:internet_banking/src/src.dart';
import 'package:provider/provider.dart';

class UserScreen extends StatelessWidget {
  const UserScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final appProvider = Provider.of<AppProvider>(context);
    return ScreenFuture(
        future: appProvider.setUser,
        skeleton: const HomeSkeleton(),
        child: SingleChildScrollView(
          child: Column(
            children: [
              Padding(
                padding: const EdgeInsets.only(
                  top: 20.0,
                  left: 20.0,
                  right: 20.0,
                ),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(20.0),
                  child: Container(
                    color: Colors.blue[900],
                    height: 170.0,
                    child: const Center(
                      child: Text(
                        'principal',
                        style: TextStyle(
                          fontSize: 30.0,
                          color: Colors.white,
                        ),
                      ),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 15.0),
              const Text(
                'Other Products',
                style: TextStyle(
                  fontSize: 20.0,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 15.0),
              const CardSwipper(),
              const SizedBox(height: 15.0),
              const Sliders(
                title: 'Beneficiaries',
              ),
              const Sliders(
                title: 'Favorites',
              ),
            ],
          ),
        ));
  }
}
