import React from "react";
import Layout from "../components/Layout/Layout";

export default function Contact() {
  return (
    <Layout title={"Contact Us"}>
      <div className="row contactus">
        <div class="col-md-6">
          <img
            src="/images/contactus.jpeg"
            alt="Contact Us"
            style={{ width: "100%" }}
          />
        </div>
        <div class="col-md-4">
          <h1 className="bg-dark p-2 text-white text center">Contact Us</h1>
          <p className="text-justify mt-2">
            Any Query And Info About Product Fell Free To Call Anytime we 24X7
            Available
            <br />
            <br />
            <span className="mt-3">✉ : www.help@ck.com</span>
            <br />
            <span className="mt-3">📞 : 012-52145214</span>
            <br />
            <span className="mt-3">💁‍♂️ 18000-000-000(Toll -Free)</span>
            <br />
          </p>
        </div>
      </div>
    </Layout>
  );
}
