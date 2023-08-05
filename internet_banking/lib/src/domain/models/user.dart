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
    String? id,
    DateTime? createdAt,
  }) : super(id: id, createdAt: createdAt);

  factory UserModel.fromJson(Map<String, dynamic> json) => UserModel(
        id: json["_id"],
        role: json["role"],
        createdAt: DateTime.parse(json["createdAt"]),
        firstName: json["firstName"],
        lastName: json["lastName"],
        username: json["username"],
        email: json["email"],
      );

  UserModel copyWith({
    String? id,
    String? firstName,
    String? lastName,
    String? email,
    String? username,
    String? password,
    int? role,
  }) {
    return UserModel(
      id: id ?? this.id,
      firstName: firstName ?? this.firstName,
      lastName: lastName ?? this.lastName,
      email: email ?? this.email,
      username: username ?? this.username,
      password: password ?? this.password,
      role: role ?? this.role,
    );
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

  UserModel setFirstName({required String firstName}) {
    this.firstName = firstName;
    return this;
  }

  UserModel setLastName({required String lastName}) {
    this.lastName = lastName;
    return this;
  }

  UserModel setEmail({required String email}) {
    this.email = email;
    return this;
  }

  UserModel setUsername({required String username}) {
    this.username = username;
    return this;
  }

  UserModel setPassword({required String password}) {
    this.password = password;
    return this;
  }

  UserModel setRole({required int role}) {
    this.role = role;
    return this;
  }
}
