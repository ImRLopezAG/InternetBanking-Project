import 'package:flutter_dotenv/flutter_dotenv.dart';

class Env {
  static String? baseUrl = dotenv.env['API_URL'];
}
