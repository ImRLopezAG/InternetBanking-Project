import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
void main() {
  runApp(const MainApp());
}


class AppState extends StatelessWidget {
  const AppState({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider<MovieProvider>(
          create: (_) => MovieProvider(),
          lazy: false,
        ),
        ChangeNotifierProvider<CastProvider>(
          create: (_) => CastProvider(),
          lazy: false,
        ),
        ChangeNotifierProvider<VideoProvider>(
          create: (_) => VideoProvider(),
          lazy: false,
        ),
        ChangeNotifierProvider<AppProvider>(
          create: (_) => AppProvider(),
          lazy: false,
        ),
        ChangeNotifierProvider<ShowProvider>(
          create: (_) => ShowProvider(),
          lazy: false,
        ),
      ],
      child: const MainApp(),
    );
  }
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


