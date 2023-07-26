import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:internet_banking/src/src.dart';

class UserRepository {
  String baseUrl = 'http://localhost:3000/api/user';

  Future<List<UserModel>> getAll({required String token}) async {
    final response = await http.get(Uri.https(baseUrl, '/list'), headers: {
      'authorization': 'Bearer $token',
      'Content-Type': 'application/json'
    });
    if (response.statusCode == 200) {
      final data = jsonDecode(response.body) as List;
      return data.map((e) => UserModel.fromJson(e)).toList();
    } else {
      throw Exception('Failed to load users');
    }
  }

  Future<UserModel> getById({required String id,required String token }) async {
    final response = await http.get(Uri.parse('$baseUrl/get/$id'), headers: {
      'authorization': 'Bearer $token',
      'Content-Type': 'application/json'
    });
    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      return UserModel.fromJson(data);
    } else {
      throw Exception('Failed to load user');
    }
  }
  Future<UserModel> getByEmail({required String email,required String token }) async {
    final response = await http.get(Uri.parse('$baseUrl/get/$email'), headers: {
      'authorization': 'Bearer $token',
      'Content-Type': 'application/json'
    });
    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      return UserModel.fromJson(data);
    } else {
      throw Exception('Failed to load user');
    }
  }
  Future<UserModel> getByUsername({required String username,required String token }) async {
    final response = await http.get(Uri.parse('$baseUrl/get/$username'), headers: {
      'authorization': 'Bearer $token',
      'Content-Type': 'application/json'
    });
    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      return UserModel.fromJson(data);
    } else {
      throw Exception('Failed to load user');
    }
  }
}
