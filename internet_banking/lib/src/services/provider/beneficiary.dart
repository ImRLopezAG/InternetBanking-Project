import 'package:dart_jsonwebtoken/dart_jsonwebtoken.dart';
import 'package:flutter/material.dart';
import 'package:internet_banking/src/src.dart';

class BeneficiaryProvider with ChangeNotifier {
  final _beneficiaryRepository = BeneficiaryRepository();
  List<UserModel> _beneficiaries = [];
  List<UserModel> get beneficiaries => _beneficiaries;
  set beneficiaries(List<UserModel> beneficiaries) {
    _beneficiaries = beneficiaries;
    notifyListeners();
  }

  Future<bool> addBeneficiary(
      {required String token, required UserModel user}) async {
    try {
      final beneficiary = BeneficiaryModel(
        sender: Payload.fromJson(JWT.decode(token).payload).uid,
        receptor: user.id,
      );
      await _beneficiaryRepository.create(
          beneficiary: beneficiary, token: token);
      beneficiaries = [..._beneficiaries, user];
      notifyListeners();
      return true;
    } catch (e) {
      return false;
    }
  }

  Future<List<UserModel>> getAll(
      {required String token, required String id}) async {
    try {
      final response =
          await _beneficiaryRepository.getAll(token: token, sender: id);
      _beneficiaries = response;
      return _beneficiaries;
    } catch (e) {
      _beneficiaries = [];
      return _beneficiaries;
    }
  }
}
