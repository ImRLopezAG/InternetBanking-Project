import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:internet_banking/src/src.dart';
void main() {
  runApp(const AppState());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: Scaffold(
        body: Center(
          child: Text('Hello World!'),
        ),
      ),
    );
  }
}

class AppState extends StatelessWidget {
  const AppState({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider<AppProvider>(
          create: (_) => AppProvider(),
          lazy: false,
        ),
        ChangeNotifierProvider<UserProvider>(
          create: (_) => UserProvider(),
          lazy: false,
        ),
        ChangeNotifierProvider<PaymentProvider>(
          create: (_) => PaymentProvider(),
          lazy: false,
        ),
        ChangeNotifierProvider<ProductProvider>(
          create: (_) => ProductProvider(),
          lazy: false,
        ),
        ChangeNotifierProvider<BeneficiaryProvider>(
          create: (_) => BeneficiaryProvider(),
          lazy: false,
        ),
      ],
      child: const MainApp(),
    );
  }
}


