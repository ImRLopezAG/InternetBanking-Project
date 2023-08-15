import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:internet_banking/src/src.dart';

class PaymentRepository {
  final String _baseUrl = Env.baseUrl!;
  final _endpoint = 'api/payment/';

  static final PaymentRepository _instance = PaymentRepository._internal();
  PaymentRepository._internal();
  factory PaymentRepository() => _instance;

  Future<List<PaymentModel>> getAll(
      {required String token, required String sender}) async {
    final response = await getRequest(
        endpoint: 'list', token: token, positional: sender);
    return (response as List).map((e) => PaymentModel.fromJson(e)).toList();
  }

  Future<List<PaymentModel>> getTransactions(
      {required String token, required String sender}) async {
    final response = await getRequest(
        endpoint: 'transaction', token: token, positional: sender);
    return (response as List).map((e) => PaymentModel.fromJson(e)).toList();
  }

  Future<List<PaymentModel>> getPayments(
      {required String token, required String sender}) async {
    final response = await getRequest(
        endpoint: 'payment', token: token, positional: sender);
    return (response as List).map((e) => PaymentModel.fromJson(e)).toList();
  }

  Future<bool> create(
      {required String token, required PaymentModel beneficiary}) async {
    try {
      final response = await postRequest(
          endpoint: 'create', token: token, body: beneficiary.toJson());
      return response.success!;
    } catch (e) {
      return false;
    }
  }

  Future<bool> creditPayment(
      {required String token, required PaymentModel pay}) async {
    try {
      final response = await postRequest(
          endpoint: 'credit', token: token, body: pay.toJson());
      return response.success!;
    } catch (e) {
      return false;
    }
  }

  Future<bool> loanPayment(
      {required String token, required PaymentModel pay}) async {
    try {
      final response =
          await postRequest(endpoint: 'loan', token: token, body: pay.toJson());
      return response.success!;
    } catch (e) {
      return false;
    }
  }

  Future<dynamic> getRequest(
      {required String endpoint,
      required String token,
      String? positional}) async {
    final response = await http.get(
        Uri.https(_baseUrl, '${_endpoint + endpoint}/$positional'),
        headers: {
          'authorization': 'Bearer $token',
          'Content-Type': 'application/json'
        });
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load data');
    }
  }

  Future<Response> postRequest(
      {required String endpoint, required String token, dynamic body}) async {
    final response = await http.post(Uri.https(_baseUrl, _endpoint + endpoint),
        body: json.encode(body),
        headers: {
          'authorization': 'Bearer $token',
          'Content-Type': 'application/json'
        });
    if (response.statusCode == 200 || response.statusCode == 201) {
      return Response()
          .setSuccess(success: true)
          .setMessage(message: 'Payment successful')
          .setData(data: json.decode(response.body));
    }
    if (response.statusCode == 400) {
      return Response()
          .setSuccess(success: false)
          .setMessage(message: 'Insufficient funds')
          .setData(data: json.decode(response.body));
    } else {
      return Response()
          .setSuccess(success: false)
          .setMessage(message: 'Payment failed')
          .setData(data: json.decode(response.body));
    }
  }
}

class Response {
  String? message;
  bool? success;
  dynamic data;

  Response({
    this.message,
    this.success,
    this.data,
  });

  Response setSuccess({required bool success}) {
    this.success = success;
    return this;
  }

  Response setMessage({required String message}) {
    this.message = message;
    return this;
  }

  Response setData({required dynamic data}) {
    this.data = data;
    return this;
  }

  Map<String, dynamic> toJson() {
    return {
      'message': message,
      'success': success,
      'data': data,
    };
  }
}
