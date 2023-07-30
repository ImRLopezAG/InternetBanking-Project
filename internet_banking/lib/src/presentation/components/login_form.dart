import 'package:flutter/material.dart';
import 'package:internet_banking/src/src.dart';
import 'package:provider/provider.dart';

class LoginForm extends StatelessWidget {
  const LoginForm({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Expanded(
      flex: 5,
      child: Container(
        width: double.infinity,
        decoration: const BoxDecoration(
          color: Colors.black,
          borderRadius: BorderRadius.only(
            topLeft: Radius.circular(
              48.0,
            ),
            topRight: Radius.circular(
              48.0,
            ),
          ),
        ),
        child: const FormFields(),
      ),
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

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: Form(
        key: _formKey,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
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
              height: 10.0,
            ),
            MaterialButton(
              onPressed: () async {
                if (_formKey.currentState!.validate()) {
                  final request = AuthRequest(
                    username: _controllers['username']!.text.trim(),
                    password: _controllers['password']!.text.trim(),
                  );

                  final isLogin = await _appProvider.login(request: request);
                  if (isLogin) {
                    Navigator.popAndPushNamed(context, '/home');
                  }
                }
              },
              minWidth: double.infinity,
              height: 60.0,
              color: Colors.blue.shade900,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(
                  50.0,
                ),
              ),
              child: const Text(
                'Login',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 18.0,
                  fontWeight: FontWeight.bold,
                ),
              ),
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
