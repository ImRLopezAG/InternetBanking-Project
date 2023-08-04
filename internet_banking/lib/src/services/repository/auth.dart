import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:internet_banking/src/src.dart';

class AuthRepository {
  String? baseUrl = Env.baseUrl!;
  final _endpoint = 'api/auth/';

  static final AuthRepository _instance = AuthRepository._internal();
  AuthRepository._internal();
  factory AuthRepository() => _instance;

  Future<AuthResponse> login(AuthRequest request) async {
    final response =
        await http.post(Uri.https(baseUrl!, '${_endpoint}login'), body: {
      'username': request.username,
      'password': request.password,
    });
    if (response.statusCode == 200) {
      return AuthResponse.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Failed to login');
    }
  }

  Future<bool> register({required UserModel user}) async {
    try {
      final response = await http.post(
          Uri.https(baseUrl!, '${_endpoint}sign-up'),
          body: jsonEncode(user.toJson()),
          headers: {'Content-Type': 'application/json'});
      return response.statusCode == 201;
    } catch (e) {
      throw Exception('$e');
    }
  }

  Future<bool> update({required UserModel user, required String token}) async {
    try {
      final id = user.id;
      final response = await http.put(
          Uri.https(baseUrl!, '${_endpoint}update/$id'),
          body: jsonEncode(user.toJson()),
          headers: {
            'authorization': 'Bearer $token',
            'Content-Type': 'application/json'
          });
      return response.statusCode == 200;
    } catch (e) {
      throw Exception('$e');
    }
  }
}

class AuthResponse {
  final String? token;
  final String? message;
  final bool? success;

  AuthResponse({this.token, this.message, this.success});

  AuthResponse.fromJson(Map<String, dynamic> json)
      : token = json['token'],
        message = json['message'],
        success = json['success'];
}

class AuthRequest {
  final String? username;
  final String? password;

  AuthRequest({this.username, this.password});

  Map<String, dynamic> toJson() => {
        'username': username,
        'password': password,
      };
}
