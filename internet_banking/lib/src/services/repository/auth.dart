import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:internet_banking/src/src.dart';

class AuthRepository {
  String? baseUrl = Env.baseUrl!;
  final _endpoint = 'api/auth/';

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

  Future<UserModel> register({required UserModel user}) async {
    final response = await http.post(Uri.https(baseUrl!, '${_endpoint}sign-up'),
        body: jsonEncode(user.toJson()),
        headers: {'Content-Type': 'application/json'});
    if (response.statusCode == 201) {
      return UserModel.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Failed to register');
    }
  }

  Future<UserModel> update(
      {required UserModel user, required String token}) async {
    final response = await http.put(Uri.https(baseUrl!, '${_endpoint}update'),
        body: jsonEncode(user.toJson()),
        headers: {
          'authorization': 'Bearer $token',
          'Content-Type': 'application/json'
        });
    if (response.statusCode == 200) {
      return UserModel.fromJson(jsonDecode(response.body));
    } else {
      throw Exception('Failed to update');
    }
  }
}

class AuthResponse {
  final String? token;
  final String? message;

  AuthResponse({this.token, this.message});

  AuthResponse.fromJson(Map<String, dynamic> json)
      : token = json['token'],
        message = json['message'];
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
