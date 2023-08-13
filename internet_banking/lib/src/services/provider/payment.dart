import 'package:dart_jsonwebtoken/dart_jsonwebtoken.dart';
import 'package:flutter/material.dart';
import 'package:internet_banking/src/src.dart';

class PaymentProvider with ChangeNotifier {
  final PaymentRepository _paymentRepository = PaymentRepository();

  List<PaymentModel> _payments = [];
  List<PaymentModel> get payments =>
      _payments.where((pay) => pay.type == 1).toList();
  List<PaymentModel> get transactions =>
      _payments.where((pay) => pay.type == 2).toList();

  Future<void> getPayments({required String token}) async {
    final sender = Payload.fromJson(JWT.decode(token).payload).uid!;
    _payments = await _paymentRepository.getAll(token: token, sender: sender);
  }

  Future<PaymentError> creditPayment({required String token, required PaymentModel pay}) async {
    final response = await _paymentRepository.creditPayment(token: token, pay: pay);
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

  Future<PaymentError> loanPayment({required String token, required PaymentModel pay}) async {
    final response = await _paymentRepository.loanPayment(token: token, pay: pay);
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

  Future<PaymentError> transfer({required String token, required PaymentModel pay}) async {
    final response = await _paymentRepository.create(token: token, beneficiary: pay);
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
