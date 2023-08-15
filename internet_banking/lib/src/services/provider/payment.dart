import 'package:dart_jsonwebtoken/dart_jsonwebtoken.dart';
import 'package:flutter/material.dart';
import 'package:internet_banking/src/src.dart';

class PaymentProvider with ChangeNotifier {
  final PaymentRepository _paymentRepository = PaymentRepository();

  List<PaymentModel> _payments = [];
  List<PaymentModel> _transactions = [];

  

  Future<bool> getPayments({required String token}) async {
    _payments.clear();
    final sender = Payload.fromJson(JWT.decode(token).payload).uid!;
    _payments
        .addAll(await _paymentRepository.getAll(sender: sender, token: token));
    print(_payments.length);
    if (_payments.isNotEmpty) {
      return true;
    } else {
      return false;
    }
  }

  List<PaymentModel> get payments => _payments;
  List<PaymentModel> get transactions => _transactions;

  Future<List<PaymentModel>> getTransactions({required String token}) async {
    _transactions.clear();
    final sender = Payload.fromJson(JWT.decode(token).payload).uid!;
    _transactions.addAll(
        await _paymentRepository.getTransactions(sender: sender, token: token));
    return _transactions;
  }

  Future<PaymentError> creditPayment(
      {required String token, required PaymentModel pay}) async {
    final response =
        await _paymentRepository.creditPayment(token: token, pay: pay);
    if (response) {
      _payments = [..._payments, pay];
      notifyListeners();
      return PaymentError()
          .setSuccess(success: true)
          .setMessage(message: 'Payment successful');
    } else {
      return PaymentError()
          .setSuccess(success: false)
          .setMessage(message: 'Payment failed');
    }
  }

  Future<PaymentError> loanPayment(
      {required String token, required PaymentModel pay}) async {
    final response =
        await _paymentRepository.loanPayment(token: token, pay: pay);
    if (response) {
      _payments = [..._payments, pay];
      notifyListeners();
      return PaymentError()
          .setSuccess(success: true)
          .setMessage(message: 'Payment successful');
    } else {
      return PaymentError()
          .setSuccess(success: false)
          .setMessage(message: 'Payment failed');
    }
  }

  Future<PaymentError> transfer(
      {required String token, required PaymentModel pay}) async {
    final response =
        await _paymentRepository.create(token: token, beneficiary: pay);
    if (response) {
      _payments = [..._payments, pay];
      notifyListeners();
      return PaymentError()
          .setSuccess(success: true)
          .setMessage(message: 'Payment successful');
    } else {
      return PaymentError()
          .setSuccess(success: false)
          .setMessage(message: 'Payment failed');
    }
  }
}

class PaymentError {
  String? message;
  bool? success;

  PaymentError({
    this.message,
    this.success,
  });

  PaymentError setSuccess({required bool success}) {
    this.success = success;
    return this;
  }

  PaymentError setMessage({required String message}) {
    this.message = message;
    return this;
  }
}
