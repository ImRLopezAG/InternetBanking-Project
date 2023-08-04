import 'dart:async';

import 'package:dart_jsonwebtoken/dart_jsonwebtoken.dart';
import 'package:flutter/material.dart';
import 'package:internet_banking/src/src.dart';

class UserProvider with ChangeNotifier {
  final _authRepository = AuthRepository();
  final _userRepository = UserRepository();

  final StreamController<List<UserModel>> _suggestionStreamController =
      StreamController<List<UserModel>>.broadcast();

  final Debouncer _debouncer =
      Debouncer(duration: const Duration(milliseconds: 500));

  Stream<List<UserModel>> get suggestionStream =>
      _suggestionStreamController.stream;

  Future<bool> saveUser({required UserModel user, String token = ''}) async {
    try {
      if (token.isNotEmpty) {
        await _authRepository.update(user: user, token: token);
      } else {
        await _authRepository.register(user: user);
      }
      return true;
    } catch (e) {
      print(e);
      return false;
    }
  }

  void searchUser(
      {required String query,
      required String token,
      required List<UserModel> beneficiaries}) {
    _debouncer.value = '';
    _debouncer.onValue = (value) async {
      final results = await _userRepository.search(query: value, token: token);
      _suggestionStreamController.add(results
          .where((user) =>
              user.id != Payload.fromJson(JWT.decode(token).payload).uid &&
              user.role != 1 &&
              !beneficiaries.any((b) => b.id == user.id))
          .toList());
    };
    final timer = Timer.periodic(const Duration(milliseconds: 300), (_) {
      _debouncer.value = query;
    });
    Future.delayed(const Duration(milliseconds: 301))
        .then((_) => timer.cancel());
  }
}
