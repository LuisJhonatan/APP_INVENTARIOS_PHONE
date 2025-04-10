import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Skeleton } from "./skeleton";

export default function CarDetail({
  title,
  firstValue,
  secondValue,
  isLoading,
  Icon
}: {
  title: string;
  firstValue: string;
  secondValue: string;
  isLoading: boolean;
  Icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between ">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>

        <Icon className="h-8 w-8 text-muted-foreground" />
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <>
            <Skeleton className="h-8 w-20 bg-gray-200 animate-pulse" />
          </>
        ) : (
          <p className="text-xl font-bold mb-2">{firstValue}</p>
        )}

        {isLoading ? (
          <>
            <Skeleton className="h-4 w-32 mt-1 bg-gray-200 animate-pulse" />
          </>
        ) : (
          <p className="text-xs text-muted-foreground">{secondValue}</p>
        )}
      </CardContent>
    </Card>
  );
}
