import { Request, Response } from "express";
export default function appCheckSum(
  req: Request,
  res: Response,
  err: Error,
  params: { [key: string]: string },

  checksum: string
) {
  if (err) {
    console.log("Error: " + err);
  }

  var form_fields = "";
  for (var x in params) {
    form_fields +=
      "<input type='hidden' name='" + x + "' value='" + params[x] + "' >";
  }
  form_fields +=
    "<input type='hidden' name='CHECKSUMHASH' value='" + checksum + "' >";

  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(
    '<html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method="post" action="' +
      process.env.TXN_URL! +
      '" name="f1">' +
      form_fields +
      '</form><script type="text/javascript">document.f1.submit();</script></body></html>'
  );
  res.end();
}
