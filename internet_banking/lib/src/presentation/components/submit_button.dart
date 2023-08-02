import 'package:flutter/material.dart';

class SubmitButton extends StatefulWidget {
  final Future Function() onPressed;
  final String? label;
  const SubmitButton({Key? key, required this.onPressed, this.label = 'Submit'})
      : super(key: key);
  @override
  State<SubmitButton> createState() => _SubmitButtonState();
}

class _SubmitButtonState extends State<SubmitButton> {
  bool _isLoading = false;
  @override
  Widget build(BuildContext context) {
    return MaterialButton(
      onPressed: () async {
        setState(() {
          _isLoading = true;
        });
        await widget.onPressed();
        setState(() {
          _isLoading = false;
        });
      },
      color: Colors.blue.shade900,
      minWidth: double.infinity,
      height: 60.0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(
          50.0,
        ),
      ),
      child: _isLoading
          ? const Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                SizedBox(
                  height: 20.0,
                  width: 20.0,
                  child: CircularProgressIndicator(
                    color: Colors.white,
                  ),
                ),
                SizedBox(
                  width: 10.0,
                ),
                Text(
                  'Sending...',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 18.0,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            )
          : Text(
              widget.label ?? 'Submit',
              style: const TextStyle(
                color: Colors.white,
                fontSize: 18.0,
                fontWeight: FontWeight.bold,
              ),
            ),
    );
  }
}
