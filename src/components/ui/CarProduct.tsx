import { Card, CardContent, CardHeader, CardTitle } from "./card";

export default function CarProduct({
  nombre,
  precio_venta,
  stock,
}: {
  nombre: string;
  precio_venta: string;
  stock: number;
}) {
  return (
    <Card className="h-[144px]">
      <CardHeader>
        <CardTitle>{nombre}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Precio: {precio_venta}</p>
        <p>Stock: {stock}</p>
      </CardContent>
    </Card>
  );
}
