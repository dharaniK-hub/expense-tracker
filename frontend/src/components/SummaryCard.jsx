import { ArrowDownRight, ArrowUpRight, Wallet } from "lucide-react";

const iconMap = {
  income: ArrowUpRight,
  expense: ArrowDownRight,
  balance: Wallet,
};

const SummaryCard = ({ title, amount, icon }) => {
  const Icon = iconMap[icon];
  const value = Number(amount || 0);

  return (
    <article className={`summary-card ${icon}-card`}>
      <div className="summary-card-head">
        <span>{title}</span>
        <span className="summary-icon"><Icon size={20} aria-hidden="true" /></span>
      </div>
      <strong>
        Rs. {value.toLocaleString("en-LK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </strong>
      <p>{title === "Monthly budget" ? "Your monthly budget limit." : icon === "income" ? "Income records are not yet tracked." : "For the selected filters."}</p>
    </article>
  );
};

export default SummaryCard;
