import 'package:flutter/material.dart';
import 'package:internet_banking/src/src.dart';
import 'package:dart_jsonwebtoken/dart_jsonwebtoken.dart';

class AppProvider with ChangeNotifier {
  UserModel _user = UserModel();
  final _authRepository = AuthRepository();
  final  _userRepository = UserRepository();
  String _token = '';

  UserModel get user => _user;
  String get token => _token;

  Future login({required AuthRequest request}) async {
    final response = await _authRepository.login(request);
    final jwt = JWT.decode(response.token!);
    _token = response.token!;
    _user = await _userRepository.getById(id: jwt.payload.uid, token: response.token!);
  }
}
