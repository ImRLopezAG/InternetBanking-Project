
import 'package:internet_banking/src/src.dart';

class UserBuilder{
  final UserModel _userModel = UserModel();

  static final UserBuilder _instance = UserBuilder._internal();
  UserBuilder._internal();
  factory UserBuilder() => _instance;

  UserModel build(){
    return _userModel;
  }

  UserBuilder setFirstName({required String firstName}) {
    _userModel.firstName = firstName;
    return this;
  }

  UserBuilder setLastName({required String lastName}) {
    _userModel.lastName = lastName;
    return this;
  }

  UserBuilder setEmail({required String email}) {
    _userModel.email = email;
    return this;
  }

  UserBuilder setUsername({required String username}) {
    _userModel.username = username;
    return this;
  }

  UserBuilder setPassword({required String password}) {
    _userModel.password = password;
    return this;
  }

  UserBuilder setRole({required int role}) {
    _userModel.role = role;
    return this;
  }
}