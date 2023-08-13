import 'dart:async';

import 'package:flutter/material.dart';
import 'package:internet_banking/src/src.dart';
import 'package:provider/provider.dart';

class LoginForm extends StatelessWidget {
  const LoginForm({super.key});

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    return AnimatedContainer(
      duration: const Duration(
        milliseconds: 500,
      ),
      width: double.infinity,
      height: size.height * 0.7,
      alignment: Alignment.topCenter,
      decoration: const BoxDecoration(
        color: Colors.black,
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(
            49.0,
          ),
          topRight: Radius.circular(
            49.0,
          ),
        ),
      ),
      child: const FormFields(),
    );
  }
}

class FormFields extends StatefulWidget {
  const FormFields({
    super.key,
  });

  @override
  State<FormFields> createState() => _FormFieldsState();
}

class _FormFieldsState extends State<FormFields> {
  late AppProvider _appProvider;
  final _formKey = GlobalKey<FormState>();
  final Map<String, TextEditingController> _controllers = {
    'username': TextEditingController(),
    'password': TextEditingController(),
  };

  bool _loginSuccess = true;
  String _responseMessage = '';

  @override
  void initState() {
    super.initState();
    _appProvider = Provider.of<AppProvider>(context, listen: false);
  }

  @override
  void dispose() {
    _controllers.forEach((key, value) {
      value.dispose();
    });
    super.dispose();
  }

  Future _login() async {
    if (_formKey.currentState!.validate()) {
      setState(() {});
      final request = AuthRequest(
        username: _controllers['username']!.text.trim(),
        password: _controllers['password']!.text.trim(),
      );
      final response = await _appProvider.login(request: request);
      if (response.success!) {
        Navigator.popAndPushNamed(context, '/home');
        setState(() {});
        return true;
      } else {
        _loginSuccess = false;
        _responseMessage = response.message!;
        setState(() {});
        Timer(const Duration(milliseconds: 1500), () {
          _loginSuccess = true;
          setState(() {});
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(
        horizontal: 24.0,
      ),
      child: Form(
        key: _formKey,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Center(
                child: Text(
                  _loginSuccess ? '' : '● $_responseMessage',
                  style: const TextStyle(
                    color: Colors.red,
                    fontSize: 24.0,
                  ),
                ),
              ),
            ),
            const SizedBox(
              height: 10.0,
            ),
            TextForm(
              label: 'Username',
              hint: 'Enter your username',
              prefixIcon: const Icon(
                Icons.person_rounded,
              ),
              controller: _controllers['username']!,
            ),
            const SizedBox(
              height: 10.0,
            ),
            TextForm(
              label: 'Password',
              hint: 'Enter your password',
              prefixIcon: const Icon(
                Icons.lock_rounded,
              ),
              controller: _controllers['password']!,
            ),
            const SizedBox(
              height: 15.0,
            ),
            SubmitButton(
              onPressed: _login,
              label: 'Login',
              responses: const {
                'success': 'Login successful',
                'error': 'Login failed',
              },
            ),
            const SizedBox(
              height: 10.0,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  'Don\'t have an account?',
                  style: TextStyle(
                    color: Colors.grey.shade700,
                    fontSize: 16.0,
                  ),
                ),
                TextButton(
                  onPressed: () => Navigator.pushNamed(context, '/sig-in'),
                  child: Text(
                    'Sign Up',
                    style: TextStyle(
                      color: Colors.blue.shade900,
                      fontSize: 16.0,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
