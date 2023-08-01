import 'package:flutter/material.dart';
import 'package:internet_banking/src/src.dart';
import 'package:dart_jsonwebtoken/dart_jsonwebtoken.dart';

class AppProvider with ChangeNotifier {
  UserModel _user = UserModel();
  final _authRepository = AuthRepository();
  final _userRepository = UserRepository();
  String _token = '';

  int _homeIndex = 0;

  int get homeIndex => _homeIndex;
  set homeIndex(int index) {
    _homeIndex = index;
    notifyListeners();
  }

  UserModel get user => _user;
  set user(UserModel user) {
    _user = user;
    user = user;
    notifyListeners();
  }

  String get token => _token;

  Future<bool> login({required AuthRequest request}) async {
    try {
      final response = await _authRepository.login(request);
      _token = response.token!;
      return true;
    } catch (e) {
      return false;
    }
  }

  void logout() {
    _token = '';
    _user = UserModel();
    notifyListeners();
  }

  Future<bool> setUser() async {
    try {
      JWT jwt = JWT.decode(_token);
      final payload = Payload.fromJson(jwt.payload);
      _user = await _userRepository.getById(
        id: payload.uid!,
        token: _token,
      );
      return true;
    } catch (e) {
      return false;
    }
  }
}

class Payload {
  String? uid;
  String? email;
  String? username;
  Payload({this.uid, this.email, this.username});

  factory Payload.fromJson(Map<String, dynamic> json) {
    return Payload(
      uid: json['uid'],
      email: json['email'],
      username: json['username'],
    );
  }
}
