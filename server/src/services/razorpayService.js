// ==========================================
// Razorpay Payment Link Service
// ==========================================

const createRazorpayPaymentLink = async ({amount,customerName, customerContact, referenceId,}) => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId) {
    throw new Error(
      "RAZORPAY_KEY_ID is not configured"
    );
  }

  if (!keySecret) {
    throw new Error(
      "RAZORPAY_KEY_SECRET is not configured"
    );
  }

  const numericAmount = Number(amount);

  if (!numericAmount || numericAmount <= 0) {
    throw new Error(
      "Invalid Razorpay payment amount"
    );
  }

  const credentials = Buffer
    .from(`${keyId}:${keySecret}`)
    .toString("base64");

  const payload = {
    amount: Math.round(numericAmount * 100),
    currency: "INR",

    description:
      "Stay Lansdowne Booking Advance",

    reference_id:
      String(referenceId),

    customer: {
      name:
        customerName ||
        "Stay Lansdowne Guest",

      contact:
        customerContact || "",
    },

    notify: {
      sms: false,
      email: false,
    },

    reminder_enable: false,
  };

  console.log(
    "Creating Razorpay Payment Link:",
    {
      amount: numericAmount,
      referenceId,
    }
  );

  const response = await fetch(
    "https://api.razorpay.com/v1/payment_links",
    {
      method: "POST",

      headers: {
        Authorization:
          `Basic ${credentials}`,

        "Content-Type":
          "application/json",
      },

      body: JSON.stringify(payload),
    }
  );

  const data =
    await response.json();

  if (!response.ok) {
    console.error(
      "Razorpay Payment Link Error:",
      JSON.stringify(
        data,
        null,
        2
      )
    );

    throw new Error(
      data?.error?.description ||
        data?.error?.message ||
        "Failed to create Razorpay payment link"
    );
  }

  console.log(
    "✅ Razorpay Payment Link Created:",
    {
      id: data.id,
      short_url: data.short_url,
      amount: data.amount,
    }
  );

  return data;
};

export default createRazorpayPaymentLink;