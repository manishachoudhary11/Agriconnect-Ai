/** @deprecated Use useToast() from ToastContext instead */
function Toast({ message }) {
  return (
    <div className="rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-lg">
      {message}
    </div>
  );
}

export default Toast;
