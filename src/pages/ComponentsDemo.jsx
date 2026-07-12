import { useState } from "react";
import { HiInbox } from "react-icons/hi";
import Navbar from "../components/Navbar";
import {
  Badge,
  Button,
  Card,
  EmptyState,
  Input,
  Loader,
  Modal,
  Skeleton,
  SkeletonCard,
} from "../components/ui";
import { useToast } from "../context/ToastContext";

export default function ComponentsDemo() {
  const [showModal, setShowModal] = useState(false);
  const { toast } = useToast();

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="animate-fade-in">
          <Badge variant="info">Design System</Badge>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">UI Component Library</h1>
          <p className="mt-2 text-muted-foreground">
            Production-ready components for AgriConnect AI 2.0
          </p>

          <div className="mt-10 space-y-10">
            <Card title="Buttons">
              <div className="flex flex-wrap gap-3">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button isLoading>Loading</Button>
              </div>
            </Card>

            <Card title="Form Inputs">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Email" placeholder="you@example.com" />
                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter password"
                  error="Password is required"
                />
              </div>
            </Card>

            <Card title="Badges">
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="info">Info</Badge>
                <Badge variant="primary">Primary</Badge>
              </div>
            </Card>

            <Card title="Loading States">
              <div className="flex flex-wrap items-center gap-8">
                <Loader />
                <Loader size="sm" />
                <Loader size="lg" />
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <SkeletonCard />
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            </Card>

            <Card title="Empty State">
              <EmptyState
                icon={HiInbox}
                title="No crops found"
                description="Get started by adding your first crop to the dashboard."
                actionLabel="Add crop"
                onAction={() => toast("Crop form coming soon", "info")}
              />
            </Card>

            <Card title="Toast Notifications">
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => toast("Changes saved successfully", "success")}>
                  Success
                </Button>
                <Button variant="destructive" onClick={() => toast("Something went wrong", "error")}>
                  Error
                </Button>
                <Button variant="outline" onClick={() => toast("New update available", "info")}>
                  Info
                </Button>
                <Button variant="secondary" onClick={() => toast("Check your inputs", "warning")}>
                  Warning
                </Button>
              </div>
            </Card>

            <Card title="Modal">
              <Button onClick={() => setShowModal(true)}>Open Modal</Button>
              <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="AI Recommendation"
                description="Based on your soil and weather data"
              >
                <p className="text-sm text-muted-foreground">
                  Rice is recommended for your current conditions. Expected yield
                  increase of 12% compared to last season.
                </p>
                <div className="mt-6 flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setShowModal(false)}>
                    Dismiss
                  </Button>
                  <Button onClick={() => setShowModal(false)}>Apply</Button>
                </div>
              </Modal>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
