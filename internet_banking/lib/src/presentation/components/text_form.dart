import 'package:flutter/material.dart';

class TextForm extends StatelessWidget {
  final String label;
  final String hint;
  final Icon prefixIcon;
  final TextEditingController controller;

  const TextForm({
    super.key,
    required this.label,
    required this.hint,
    required this.prefixIcon,
    required this.controller,
  });

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      obscureText:
          label == 'Password' || label == 'Confirm Password' ? true : false,
      controller: controller,
      decoration: InputDecoration(
        labelText: label,
        hintText: hint,
        prefixIcon: prefixIcon,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(
            10.0,
          ),
        ),
      ),
      validator: (value) {
        if (value == null || value.isEmpty) {
          return 'Please ${hint.toLowerCase()}';
        }
        return null;
      },
    );
  }
}
