import 'package:flutter/material.dart';
import 'package:internet_banking/src/src.dart';

class UserProvider with ChangeNotifier {
  final _authRepository = AuthRepository();
  Future<bool> saveUser({required UserModel user, String token = ''}) async {
    try {
      if (token.isNotEmpty) {
        await _authRepository.update(user: user, token: token);
      } else {
        await _authRepository.register(user: user);
      }
      return true;
    } catch (e) {
      return false;
    }
  }
}
