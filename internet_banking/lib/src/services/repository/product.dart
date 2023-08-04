import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:internet_banking/src/src.dart';

class ProductRepository {
  final String _baseUrl = Env.baseUrl!;
  final _endpoint = 'api/product/';

  static final ProductRepository _instance = ProductRepository._internal();
  ProductRepository._internal();
  factory ProductRepository() => _instance;

  Future<List<ProductModel>> getAll({required String token, required String id}) async {
    final response =
        await getRequest(endpoint: 'list', token: token, positional: id);
    return (response as List).map((e) => ProductModel.fromJson(e)).toList();
  }

  Future<ProductModel> getByPin({required String token, required String pin}) async {
    final response = await getRequest(endpoint: 'pin', token: token, positional: pin);
    return ProductModel.fromJson(response);
  }

  Future<ProductModel> getPrincipal({required String token, required String owner}) async {
    final response = await getRequest(endpoint: 'principal', token: token, positional: owner);
    return ProductModel.fromJson(response);
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
}
