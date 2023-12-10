import React from "react";
import EarningsChart from "@/components/Charts/EarningsChart";
import SatisfactionChart from "@/components/Charts/SatisfactionChart";
import RegionMap from "@/components/Charts/RegionMap";
import GlassSpotCard from "@/components/Charts/GlassSpotCard";
import StatCard from "@/components/Charts/StatCard";
import { CommentSection } from "@/components/Dashboard/CommentSection";
import BackRoute from "@/components/UI/BackRoute";

const DroneAnalytics: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <BackRoute text="/marketplace" className="absolute top-10 left-10 z-10" />
      <h1 className="text-3xl font-bold">Drone Analytics</h1>
      <h2 className="text-xl">Details about the Drone </h2>

      <div className="grid grid-cols-3 gap-4 my-4">
        {/* Chart Containers */}
        <GlassSpotCard>
          <SatisfactionChart  />
        </GlassSpotCard>
        <GlassSpotCard>
          <EarningsChart  />
        </GlassSpotCard>
        <GlassSpotCard>
          <RegionMap />
        </GlassSpotCard>
      </div>

      <div className="grid grid-cols-3 gap-4 my-4">
        {/* Stat Cards */}
        <GlassSpotCard>
          <StatCard/>
        </GlassSpotCard>

        <GlassSpotCard>
          <StatCard  />
        </GlassSpotCard>
        <GlassSpotCard>
          <StatCard  />
        </GlassSpotCard>
      </div>
      <div className="my-6">
        {/* Comments Section */}
        <GlassSpotCard>
          <CommentSection />
        </GlassSpotCard>
      </div>
    </div>
  );
};

export default DroneAnalytics;
