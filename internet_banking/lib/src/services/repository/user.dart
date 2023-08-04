import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:internet_banking/src/src.dart';

class UserRepository {
  final String _baseUrl = Env.baseUrl!;
  final _endpoint = 'api/user/';

  static final UserRepository _instance = UserRepository._internal();
  UserRepository._internal();
  factory UserRepository() => _instance;

  Future<UserModel> getById({required String id, required String token}) async {
    final response = await getRequest(endpoint: 'get', token: token, positional: id);
    return UserModel.fromJson(response);
  }
  
  Future<List<UserModel>> search({required String query, required String token}) async {
    final response = await getRequest(endpoint: 'search', token: token, positional: query);
    return (response as List).map((e) => UserModel.fromJson(e)).toList();
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
