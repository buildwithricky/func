export const taxBudgetCalc = async (req, res) => {
  const { input } = req.body;

  const income = parseFloat(input.income || 0);
  const expenses = parseFloat(input.expenses || 0);
  const taxRate = parseFloat(input.taxRate || 20);

  if (!income || isNaN(income) || income <= 0) {
    return res.status(400).send({ output: "Please provide a valid income." });
  }

  const tax = (income * taxRate) / 100;
  const netIncome = income - tax;
  const remaining = netIncome - expenses;

  const output = {
    income,
    taxRate: `${taxRate}%`,
    tax,
    expenses,
    netIncome,
    remainingBudget: remaining,
    summary:
      remaining >= 0
        ? `You're good! You have £${remaining.toFixed(2)} left.`
        : `Uh-oh, you're over budget by £${Math.abs(remaining).toFixed(2)}.`,
  };

  res.send({ output });
};

export const funcDocs = async (req, res) => {
  res.send({
    name: "taxBudgetCalc",
    description: "Calculates tax, net income, and remaining budget.",
    input: {
      type: "object",
      description: "Object containing income, expenses, and optional tax rate.",
      example: {
        income: 5000,
        expenses: 2000,
        taxRate: 22,
      },
    },
    output: {
      type: "object",
      description: "Breakdown of tax, net income, and remaining budget.",
      example: {
        income: 5000,
        taxRate: "22%",
        tax: 1100,
        expenses: 2000,
        netIncome: 3900,
        remainingBudget: 1900,
        summary: "You're good! You have £1900.00 left.",
      },
    },
  });
};



