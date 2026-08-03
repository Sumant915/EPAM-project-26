
let balance = 25000;


let isBalanceVisible = true;

let transactionHistory = [
  {
    id: 1,
    type: 'Deposit',
    amount: 15000,
    timestamp: '02 Aug 2026, 09:30 AM',
    balanceSnap: 25000
  },
  {
    id: 2,
    type: 'Deposit',
    amount: 10000,
    timestamp: '01 Aug 2026, 02:15 PM',
    balanceSnap: 10000
  }
];


const balanceVal = document.getElementById('balance-val');
const greetingText = document.getElementById('greeting-text');
const liveDate = document.getElementById('live-date');
const liveTime = document.getElementById('live-time');


const balanceToggleBtn = document.getElementById('balance-toggle-btn');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const checkBalanceBtn = document.getElementById('check-balance-btn');

const eyeOpenIcon = document.getElementById('eye-open-icon');
const eyeClosedIcon = document.getElementById('eye-closed-icon');


const inquiryResultBox = document.getElementById('inquiry-result-box');
const inquiryBalance = document.getElementById('inquiry-balance');
const inquiryTime = document.getElementById('inquiry-time');


const tabDepositBtn = document.getElementById('tab-deposit-btn');
const tabWithdrawBtn = document.getElementById('tab-withdraw-btn');
const panelDeposit = document.getElementById('panel-deposit');
const panelWithdraw = document.getElementById('panel-withdraw');

const depositAmountInput = document.getElementById('deposit-amount');
const withdrawAmountInput = document.getElementById('withdraw-amount');
const submitDepositBtn = document.getElementById('submit-deposit-btn');
const submitWithdrawBtn = document.getElementById('submit-withdraw-btn');


const operationAlert = document.getElementById('operation-alert');
const alertIcon = document.getElementById('alert-icon');
const alertMessage = document.getElementById('alert-message');

const transactionList = document.getElementById('transaction-list');
const emptyHistoryState = document.getElementById('empty-history-state');
const historyBadge = document.getElementById('history-badge');



/**
 * Formats a raw number as Indian Rupees currency format (₹).
 * @param {number} amount - The amount to format.
 * @returns {string} Formatted currency string.
 */
function formatCurrency(amount) {
  return '₹' + amount.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function updateBalance() {
  if (isBalanceVisible) {
    balanceVal.textContent = formatCurrency(balance);
  } else {
    balanceVal.textContent = '₹ ••••••';
  }
}

/**
 * Adds a transaction object to the history array and updates the DOM list.
 * @param {string} type - The type of transaction ('Deposit' or 'Withdraw').
 * @param {number} amount - The value of the transaction.
 */
function addTransaction(type, amount) {
 
  const now = new Date();
  const timeString = now.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }) + ', ' + now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });


  const newTxn = {
    id: Date.now(), 
    type: type,
    amount: amount,
    timestamp: timeString,
    balanceSnap: balance
  };


  transactionHistory.unshift(newTxn);

 
  renderTransactionHistory();
}


function deposit() {

  const amount = parseFloat(depositAmountInput.value);


  if (isNaN(amount) || amount <= 0) {
    showAlert('Please enter a valid deposit amount greater than ₹0.', 'error');
    return;
  }

  balance += amount;


  updateBalance();


  addTransaction('Deposit', amount);


  showAlert('Successfully deposited ' + formatCurrency(amount) + ' into your account.', 'success');

  
  depositAmountInput.value = '';


  inquiryResultBox.classList.add('hidden');
}

function withdraw() {

  const amount = parseFloat(withdrawAmountInput.value);

  if (isNaN(amount) || amount <= 0) {
    showAlert('Please enter a valid withdrawal amount greater than ₹0.', 'error');
    return;
  }


  if (amount > balance) {
    showAlert('Transaction Declined. Insufficient funds available to withdraw ' + formatCurrency(amount) + '.', 'error');
    return;
  }


  balance -= amount;


  updateBalance();


  addTransaction('Withdraw', amount);

  showAlert('Successfully withdrew ' + formatCurrency(amount) + ' from your account.', 'success');


  withdrawAmountInput.value = '';


  inquiryResultBox.classList.add('hidden');
}


function renderTransactionHistory() {
  
  transactionList.innerHTML = '';

 
  const count = transactionHistory.length;
  historyBadge.textContent = count + (count === 1 ? ' Transaction' : ' Transactions');

  if (count === 0) {
    emptyHistoryState.classList.remove('hidden');
    return;
  }

  emptyHistoryState.classList.add('hidden');

  
  transactionHistory.forEach(function(txn) {

    const li = document.createElement('li');
    li.className = 'transaction-item';

   
    const isDeposit = txn.type === 'Deposit';
    const iconClass = isDeposit ? 'txn-indicator-deposit' : 'txn-indicator-withdraw';
    
  
    const iconSvg = isDeposit 
      ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="17" y1="17" x2="7" y2="7"></line><polyline points="7 17 7 7 17 7"></polyline></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>`;

    li.innerHTML = `
      <div class="txn-details">
        <div class="txn-indicator ${iconClass}">
          ${iconSvg}
        </div>
        <div class="txn-info-text">
          <span class="txn-title">${txn.type}</span>
          <span class="txn-time">${txn.timestamp}</span>
        </div>
      </div>
      <div class="txn-amount-group">
        <span class="txn-amount ${isDeposit ? 'txn-amount-deposit' : 'txn-amount-withdraw'}">
          ${isDeposit ? '+' : '-'} ₹${txn.amount.toLocaleString('en-IN')}
        </span>
        <span class="txn-balance-snap">Bal: ₹${txn.balanceSnap.toLocaleString('en-IN')}</span>
      </div>
    `;

   
    transactionList.appendChild(li);
  });
}

/**
 
 * @param {string} message 
 * @param {string} type 
 */
function showAlert(message, type) {

  operationAlert.className = 'alert-box';
  
  if (type === 'success') {
    operationAlert.classList.add('alert-success');
    alertIcon.textContent = ''; 
  } else {
    operationAlert.classList.add('alert-error');
    alertIcon.textContent = ''; 
  }

  alertMessage.textContent = message;
  operationAlert.classList.remove('hidden');

  if (window.alertTimeout) {
    clearTimeout(window.alertTimeout);
  }
  window.alertTimeout = setTimeout(function() {
    operationAlert.classList.add('hidden');
  }, 8000);
}


function updateGreeting() {
  const currentHour = new Date().getHours();
  let greetingStr = '';

  if (currentHour >= 5 && currentHour < 12) {
    greetingStr = 'Good Morning';
  } else if (currentHour >= 12 && currentHour < 17) {
    greetingStr = 'Good Afternoon';
  } else {
    greetingStr = 'Good Evening';
  }


  greetingText.textContent = greetingStr + ', Sumantra';
}


function updateClock() {
  const now = new Date();

  
  const dateOptions = { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' };
  liveDate.textContent = now.toLocaleDateString('en-GB', dateOptions);

 
  const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
  liveTime.textContent = now.toLocaleTimeString('en-US', timeOptions);
}


function initializeTabs() {
  tabDepositBtn.addEventListener('click', function() {
    tabDepositBtn.classList.add('active');
    tabWithdrawBtn.classList.remove('active');
    panelDeposit.classList.remove('hidden');
    panelWithdraw.classList.add('hidden');
    operationAlert.classList.add('hidden'); 
  });

  tabWithdrawBtn.addEventListener('click', function() {
    tabWithdrawBtn.classList.add('active');
    tabDepositBtn.classList.remove('active');
    panelWithdraw.classList.remove('hidden');
    panelDeposit.classList.add('hidden');
    operationAlert.classList.add('hidden'); 
  });
}


submitDepositBtn.addEventListener('click', deposit);
submitWithdrawBtn.addEventListener('click', withdraw);


balanceToggleBtn.addEventListener('click', function() {
  isBalanceVisible = !isBalanceVisible;
  
  if (isBalanceVisible) {
    eyeOpenIcon.classList.remove('hidden');
    eyeClosedIcon.classList.add('hidden');
  } else {
    eyeOpenIcon.classList.add('hidden');
    eyeClosedIcon.classList.remove('hidden');
  }
  

  updateBalance();
});


checkBalanceBtn.addEventListener('click', function() {
  
  inquiryBalance.textContent = formatCurrency(balance);
  
  const now = new Date();
  inquiryTime.textContent = 'as of ' + now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
  
  
  inquiryResultBox.classList.remove('hidden');

  
  showAlert('Real-time ledger balance retrieved successfully.', 'success');
});


themeToggleBtn.addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
  

  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

document.addEventListener('DOMContentLoaded', function() {
 
  updateBalance();

  
  renderTransactionHistory();

  initializeTabs();

 
  updateClock();
  updateGreeting();

 
  setInterval(updateClock, 1000);

 
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }
});
