import 'package:flutter/material.dart';
import 'package:internet_banking/src/src.dart';

class UserForm extends StatefulWidget {
  const UserForm({super.key});

  @override
  State<UserForm> createState() => _UserFormState();
}

class _UserFormState extends State<UserForm> {
  final _formKey = GlobalKey<FormState>();

  final Map<String, TextEditingController> _controllers = {
    'username': TextEditingController(),
    'password': TextEditingController(),
    'confirmPassword': TextEditingController(),
    'email': TextEditingController(),
    'firstName': TextEditingController(),
    'lastName': TextEditingController(),
  };

  final Map<String, int> _roles = {
    'admin': 1,
    'client': 2,
  };

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              TextForm(
                label: 'First Name',
                hint: 'Enter your first name',
                prefixIcon: const Icon(
                  Icons.person_rounded,
                ),
                controller: _controllers['firstName']!,
              ),
              const SizedBox(
                height: 10.0,
              ),
              TextForm(
                label: 'Last Name',
                hint: 'Enter your last name',
                prefixIcon: const Icon(
                  Icons.person_rounded,
                ),
                controller: _controllers['lastName']!,
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
                  Icons.lock,
                ),
                controller: _controllers['password']!,
              ),
              const SizedBox(
                height: 10.0,
              ),
              TextForm(
                label: 'Confirm Password',
                hint: 'Enter your confirm password',
                prefixIcon: const Icon(
                  Icons.lock,
                ),
                controller: _controllers['confirmPassword']!,
              ),
              const SizedBox(
                height: 10.0,
              ),
              TextForm(
                label: 'Email',
                hint: 'Enter your email',
                prefixIcon: const Icon(
                  Icons.email_rounded,
                ),
                controller: _controllers['email']!,
              ),
              const SizedBox(
                height: 10.0,
              ),
              DropdownButtonFormField(
                decoration: InputDecoration(
                  labelText: 'Role',
                  hintText: 'Select your role',
                  prefixIcon: const Icon(
                    Icons.person_rounded,
                  ),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(
                      10.0,
                    ),
                  ),
                ),
                items: _roles.entries.map((e) {
                  return DropdownMenuItem(
                    value: e.value,
                    child: Text(e.key),
                  );
                }).toList(),
                onChanged: (value) {},
              ),
              const SizedBox(
                height: 10.0,
              ),
              MaterialButton(
                onPressed: () {
                  if (_formKey.currentState!.validate()) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('Processing Data'),
                      ),
                    );
                    if (_controllers['password']!.text !=
                        _controllers['confirmPassword']!.text) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text(
                              'Password and Confirm Password must be the same'),
                        ),
                      );
                    } else {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Register Success'),
                        ),
                      );
                    }
                  }
                },
                color: Colors.blue,
                minWidth: double.infinity,
                height: 60.0,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(
                    50.0,
                  ),
                ),
                child: const Text(
                  'Register',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 18.0,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
