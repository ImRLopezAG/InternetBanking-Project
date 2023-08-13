import 'package:flutter/material.dart';

class SubmitButton extends StatefulWidget {
  final Future Function() onPressed;
  final String? label;
  final Map<String, String>? responses;
  const SubmitButton(
      {Key? key,
      required this.onPressed,
      this.label = 'Submit',
      this.responses})
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
          if (value != null) {
            _showToast(
              context: context,
              toast: Toast()
                  .setMessage(widget.responses != null
                      ? widget.responses!['success']!
                      : 'Success')
                  .setSuccess(true)
                  .setStatus(ToastStatus.success),
            );
          } else {
            _showToast(
              context: context,
              toast: Toast()
                  .setMessage(widget.responses != null
                      ? widget.responses!['error']!
                      : 'Failed')
                  .setSuccess(false)
                  .setStatus(ToastStatus.error),
            );
          }
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
    final overlayState = Overlay.of(context);
    final toastOverlay = OverlayEntry(
      builder: (BuildContext context) => Positioned(
        top: MediaQuery.of(context).padding.top + 16.0,
        left: 16.0,
        right: 16.0,
        child: Center(
          child: IntrinsicWidth(
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 300),
              height: 48.0,
              decoration: BoxDecoration(
                color: Colors.grey.shade900,
                borderRadius: BorderRadius.circular(
                  50.0,
                ),
              ),
              padding: const EdgeInsets.symmetric(
                horizontal: 12.0,
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
                  Flexible(
                    child: Center(
                      child: Text(
                        toast.message!,
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 18.0,
                          fontWeight: FontWeight.bold,
                          decoration: TextDecoration.none,
                        ),
                        softWrap: true,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
    overlayState.insert(toastOverlay);
    Future.delayed(toast.duration ?? const Duration(milliseconds: 1500)).then(
      (_) => toastOverlay.remove(),
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
