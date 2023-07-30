import 'package:flutter/material.dart';

class AppTheme {
  static Color primaryColor = Colors.blue.shade900;
  static ColorScheme darkScheme = ThemeData.dark().colorScheme.copyWith(
        primary: Colors.blue.shade900,
      );

  static ColorScheme lightScheme = ThemeData.light().colorScheme.copyWith(
        primary: Colors.blue.shade900,
      );

  static ThemeData darkTheme = ThemeData.dark(useMaterial3: true).copyWith(
    colorScheme: darkScheme,
    appBarTheme: const AppBarTheme(
      backgroundColor: Colors.transparent,
      elevation: 0.0,
    ),
  );

  static ThemeData lightTheme = ThemeData.light(useMaterial3: true).copyWith(
    colorScheme: lightScheme,
    bottomNavigationBarTheme: const BottomNavigationBarThemeData(
      backgroundColor: Colors.transparent,
      selectedItemColor: Colors.blue,
      unselectedItemColor: Colors.grey,
    ),
  );
}
