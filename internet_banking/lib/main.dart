import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

import 'package:internet_banking/src/src.dart';

Future<void> main() async {
  await dotenv.load(fileName: ".env");
  runApp(const AppState());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Internet Banking',
      debugShowCheckedModeBanner: false,
      initialRoute: '/login',
      theme: AppTheme.darkTheme,
      routes: {
        '/login': (context) => const LoginScreen(),
        '/home': (context) => const HomeScreen(),
        '/sig-in': (context) => const SigInScreen(),
      },
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
