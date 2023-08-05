import 'package:flutter/material.dart';
import 'package:internet_banking/src/src.dart';
import 'package:provider/provider.dart';

class UserForm extends StatefulWidget {
  final bool isEdit;
  const UserForm({super.key, this.isEdit = false});

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

  AppProvider appProvider = AppProvider();
  UserProvider userProvider = UserProvider();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      appProvider = Provider.of<AppProvider>(context, listen: false);
      userProvider = Provider.of<UserProvider>(context, listen: false);
      if (widget.isEdit) {
        final provider = appProvider.user;
        _controllers['username']!.text = provider.username!;
        _controllers['email']!.text = provider.email!;
        _controllers['firstName']!.text = provider.firstName!;
        _controllers['lastName']!.text = provider.lastName!;
      }
    });
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
              if (!widget.isEdit)
                const SizedBox(
                  height: 10.0,
                ),
              if (!widget.isEdit)
                TextForm(
                  label: 'Username',
                  hint: 'Enter your username',
                  prefixIcon: const Icon(
                    Icons.person_rounded,
                  ),
                  controller: _controllers['username']!,
                ),
              if (!widget.isEdit)
                const SizedBox(
                  height: 10.0,
                ),
              if (!widget.isEdit)
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
              SubmitButton(
                  onPressed: saveUser,
                  label: widget.isEdit ? 'Update' : 'Register')
            ],
          ),
        ),
      ),
    );
  }

  Future saveUser() async {
    if (_formKey.currentState!.validate()) {
      if (_controllers['password']!.text !=
          _controllers['confirmPassword']!.text) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Password and Confirm Password must be the same'),
          ),
        );
      }
      final user = UserModel()
          .setFirstName(firstName: _controllers['firstName']!.text.trim())
          .setLastName(lastName: _controllers['lastName']!.text.trim())
          .setUsername(username: _controllers['username']!.text.trim())
          .setEmail(email: _controllers['email']!.text.trim())
          .setPassword(password: _controllers['password']!.text.trim())
          .setRole(role: 2);
          
      if (widget.isEdit) {
        user.id = appProvider.user.id;
      }
      final response =
          await userProvider.saveUser(user: user, token: appProvider.token);
      if (response) {
        setState(() {
          if (widget.isEdit) {
            appProvider.user = user;
          }
        });
        Navigator.of(context).pop();
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Something went wrong'),
          ),
        );
      }
    }
  }
}
