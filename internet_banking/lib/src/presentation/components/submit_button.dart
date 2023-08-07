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
          _showToast(
            context: context,
            toast: Toast()
                .setMessage('loading...')
                .setSuccess(true)
                .setStatus(ToastStatus.loading),
          );
        });
        await widget.onPressed().then((value) {
          setState(() {
            _isLoading = false;
          });
          _showToast(
              context: context,
              toast: Toast()
                  .setMessage(value ? 'Success' : 'Failed')
                  .setSuccess(value)
                  .setStatus(value ? ToastStatus.success : ToastStatus.error));
        });
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

  void _showToast({required BuildContext context, required Toast toast}) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(
            50.0,
          ),
        ),
        backgroundColor: Colors.transparent,
        behavior: SnackBarBehavior.floating,
        width: 200,
        duration: toast.duration ?? const Duration(milliseconds: 500),
        elevation: 0.0,
        content: Center(
          child: Container(
            height: 40.0,
            decoration: BoxDecoration(
              color: Colors.grey.shade900,
              borderRadius: BorderRadius.circular(
                50.0,
              ),
            ),
            padding: const EdgeInsets.symmetric(
              horizontal: 10.0,
            ),
            child: Row(
              children: [
                toast.status == ToastStatus.loading
                    ? const SizedBox(
                        height: 12.0,
                        width: 12.0,
                        child: CircularProgressIndicator(
                          color: Colors.white,
                          strokeWidth: 2.0,
                        ),
                      )
                    : Icon(
                        toast.success!
                            ? Icons.check_circle_rounded
                            : Icons.error_rounded,
                        color: toast.success! ? Colors.green : Colors.red,
                      ),
                const SizedBox(
                  width: 15,
                ),
                Center(
                  child: Text(
                    toast.message!,
                    style: const TextStyle(
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
      ),
    );
  }
}

class Toast {
  String? message;
  bool? success;
  ToastStatus? status;
  Duration? duration;

  Toast({this.message, this.success, this.status, this.duration});

  Toast setSuccess(bool success) {
    this.success = success;
    return this;
  }

  Toast setMessage(String message) {
    this.message = message;
    return this;
  }

  Toast setStatus(ToastStatus status) {
    this.status = status;
    return this;
  }

  Toast setDuration(Duration duration) {
    this.duration = duration;
    return this;
  }
}

enum ToastStatus { success, error, loading }
