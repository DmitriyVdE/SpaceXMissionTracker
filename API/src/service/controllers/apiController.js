import * as HttpStatus from "../../common/lib/httpStatusCodes";
class ApiController {
  constructor() {}
  httpCreated(response, data) {
    this.sendResponse(response, HttpStatus.Created, data);
  }

  httpOk(response, data) {
    this.sendResponse(response, HttpStatus.OK, data);
  }

  httpInternalServerError(response, data) {
    this.sendResponse(response, HttpStatus.InternalServerError, data);
  }

  httpNotFound(response, data) {
    this.sendResponse(response, HttpStatus.NotFound, data);
  }

  httpNotContent(response) {
    return response.status(HttpStatus.NoContent).end();
  }

  httpBadRequest(response, data) {
    this.sendResponse(response, HttpStatus.BadRequest, data);
  }

  httpUnauthorized(response, data) {
    this.sendResponse(response, HttpStatus.Unauthorized, data);
  }

  sendResponse(response, code, data) {
    return response.status(code).json(data);
  }
}

export default ApiController;
