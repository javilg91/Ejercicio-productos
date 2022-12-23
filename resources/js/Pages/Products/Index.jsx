import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Product from "@/Components/Product";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head } from "@inertiajs/inertia-react";

export default function Index({ auth, products, categories }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        message: "",
        description: "",
        category_id: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("products.store"), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Products" />

            <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit} className="w-2/3 text-center mx-auto">
                    <div className="flex items-center justify-between space-x-6">
                        <textarea
                            value={data.message}
                            placeholder="Product name"
                            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            onChange={(e) => setData("message", e.target.value)}
                        ></textarea>
                        <textarea
                            value={data.description}
                            placeholder="Product description"
                            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        ></textarea>
                        <select
                            name="category_id"
                            onClick={(e) =>
                                setData("category_id", e.target.value)
                            }
                        >
                            {categories.map((category) => (
                                <option value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <InputError message={errors.message} className="mt-2" />
                    <PrimaryButton className="mt-4" processing={processing}>
                        Save
                    </PrimaryButton>
                </form>
                <div>
                    <h2 className="text-center font-semibold uppercase mt-20 mb-10 text-3xl ">
                        Product List
                    </h2>
                    <div className="grid grid-cols-4 gap-4 shadow-sm rounded-lg divide-y ">
                        {products.map((product) => (
                            <Product key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
