document.addEventListener('DOMContentLoaded', () => {
  const expenseForm = document.getElementById('expense-form');
  const expenseNameInput = document.getElementById('expense-name');
  const expenseAmountInput = document.getElementById('expense-amount');
  const expenseList = document.getElementById('expense-list');
  const totalAmountDisplay = document.getElementById('total-amount');

  let expenses = [];
  let totalAmount = 0;
  expenseForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const expenseName = expenseNameInput.value.trim();
    const expenseAmount = parseFloat(expenseAmountInput.value);

    if (expenseName && !isNaN(expenseAmount) && expenseAmount > 0) {
      const expense = { name: expenseName, amount: expenseAmount };
      expenses.push(expense);
      totalAmount += expenseAmount;

      const listItem = document.createElement('li');
      listItem.textContent = `${expense.name}: $${expense.amount.toFixed(2)}`;
      expenseList.appendChild(listItem);

      totalAmountDisplay.textContent = `Total Amount: $${totalAmount.toFixed(2)}`;

      expenseNameInput.value = '';
      expenseAmountInput.value = '';
    } else {
      alert('Please enter a valid expense name and amount.');
    }
  });
});
