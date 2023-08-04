import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:internet_banking/src/src.dart';

class PaymentRepository {
  final String _baseUrl = Env.baseUrl!;
  final _endpoint = 'api/beneficiary/';

  static final PaymentRepository _instance = PaymentRepository._internal();
  PaymentRepository._internal();
  factory PaymentRepository() => _instance;

  Future<List<PaymentModel>> getAll({required String token, required String sender}) async {
    final response =
        await getRequest(endpoint: 'list', token: token, positional: sender);
    return (response as List).map((e) => PaymentModel.fromJson(e)).toList();
  }

  Future<bool> create({required String token, required PaymentModel beneficiary}) async {
    final response =
        await postRequest(endpoint: 'create', token: token, body: beneficiary.toJson());
    return response['success'];
  }

  Future<dynamic> getRequest({required String endpoint,required String token,String? positional}) async {
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

  Future<dynamic> postRequest({required String endpoint,required String token,dynamic body}) async{
    final response = await http.post(Uri.https(_baseUrl,_endpoint + endpoint), 
    body: json.encode(body),
    headers: {
      'authorization': 'Bearer $token',
      'Content-Type': 'application/json'
    });
    if (response.statusCode == 200 || response.statusCode == 201) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load data');
    }
  }
}
