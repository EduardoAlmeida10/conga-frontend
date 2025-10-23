import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Field from "../../components/Field";
import Listbox from "../../components/Listbox";
import DropdownItem from "../../components/DropdownItem";
import { FaLock } from "react-icons/fa";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (logout) logout(); 
    navigate("/"); 
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
      <p className="mb-4">Bem-vindo, {user?.username}</p>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Sair
      </button>
      <Field
        title="Password"
        type="password"
        helperText={
          <a href="#" className="text-blue-500 hover:underline">
            Esqueceu a senha?
          </a>
        }
      />

      <Field
        title="Username"
        defaultValue="Text"
        status="validation"
        message="Warning: This username is similar to an existing one."
      />

      <Field
        title="Email"
        defaultValue="Text"
        status="error"
        message="Error: This email is invalid."
      />

      <Field
        title="Title"
        type="password"
        defaultValue="********"
        icon={<FaLock />}
        helperText={
          <a href="#" className="text-blue-500 hover:underline">
            Esqueceu a senha?
          </a>
        }
      />

      <Listbox>
        <DropdownItem variant="list-value" label="Label" />
        <DropdownItem variant="list-value" label="Label (Hover)" />
        <DropdownItem
          variant="list-value"
          label="Label (Active)"
          isActive={true}
        />
        <DropdownItem
          variant="list-value"
          label="Label (Disabled)"
          isDisabled={true}
        />
      </Listbox>

      <Listbox>
        <DropdownItem
          variant="multiselect"
          label="Label (Inactive)"
          isChecked={false}
        />
        <DropdownItem
          variant="multiselect"
          label="Label (Active)"
          isChecked={true}
        />
        <DropdownItem
          variant="multiselect"
          label="Label (Inactive)"
          isChecked={false}
        />
        <DropdownItem
          variant="multiselect"
          label="Label (Disabled)"
          isChecked={false}
          isDisabled={true}
        />
      </Listbox>

      <Listbox>
        <DropdownItem
          variant="search"
          category="List"
          value="Value (Inactive)"
        />
        <DropdownItem
          variant="search"
          category="List"
          value="Value (Active)"
          isActive={true}
        />
        <DropdownItem
          variant="search"
          category="List"
          value="Value (Disabled)"
          isDisabled={true}
        />
      </Listbox>
    </div>
  );
}
