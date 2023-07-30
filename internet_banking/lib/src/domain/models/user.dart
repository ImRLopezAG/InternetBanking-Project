import 'package:internet_banking/src/src.dart';

class UserModel extends BaseModel {
  String? firstName;
  String? lastName;
  String? email;
  String? username;
  String? password;
  int? role;

  UserModel({
    this.firstName,
    this.lastName,
    this.email,
    this.username,
    this.password,
    this.role,
  });

  UserModel.fromJson(Map<String, dynamic> json) {
    firstName = json['firstName'];
    lastName = json['lastName'];
    email = json['email'];
    username = json['username'];
    role = json['role'];
  }

  Map<String, dynamic> toJson() {
    return {
      'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'username': username,
      'password': password,
      'role': role,
    };
  }

  @override
  String toString() {
    return 'UserModel(firstName: $firstName, lastName: $lastName, email: $email, username: $username, password: $password, role: $role)';
  }
}
