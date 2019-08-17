export function getUserLocation() {
  return new Promise(function executor(accept, throwError) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( function onSuccess(position) {
        accept(position);
      }, function onError(error) {
        throwError(error);
      });
    } else {
      throwError(new Error ('Sorry! It appears that your browser does not support geo location features! we recommend that you update your browser or use the latest version of Google Chrome'));
    }
  })
}